using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using funlab.Hubs;
using funlab.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;

namespace funlab.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InteractiveController : ControllerBase
    {

        private readonly ILogger<InteractiveController> _logger;
        private readonly IMongoContext _database;
        private readonly IHubContext<InteractiveHub> _hubContext;

        public InteractiveController(ILogger<InteractiveController> logger, IMongoContext database, IHubContext<InteractiveHub> hubContext)
        {
            _logger = logger;
            _database = database;
            _hubContext = hubContext;
        }

        public class MessageRequest
        {
            public string Message { get; set; }
            public string ParticipantId { get; set; }
        }
        
        public class SongRequest
        {
            public string Song { get; set; }
            public string ParticipantId { get; set; }
        }
        
        public class ExperimentRequest
        {
            public string Result { get; set; }
            public string Command { get; set; }
            public string Name { get; set; }
            public string ParticipantId { get; set; }
        }

        [HttpPost("messages")]
        public async Task<ActionResult> SendMessage([FromBody] MessageRequest model)
        {
            var collection = _database.GetCollection<Participant>("Participants");
            var participant = await (await collection.FindAsync(x => x.Id == model.ParticipantId)).FirstOrDefaultAsync();
            if (participant == null) return NotFound();
            
            var messageObj = new Message(){Text = model.Message};
                participant.Messages = participant.Messages.Append(messageObj);
                await collection.ReplaceOneAsync(x => x.Id == model.ParticipantId, participant);

                await _hubContext.Clients.All.SendAsync("Invalidate", "messages");
                
                return Ok(participant);

        }
        
        public class MessageAndData
        {
            public IEnumerable<Message> Messages { get; set; }
            public IEnumerable<MusicRequest> Songs { get; set; }
            public IEnumerable<Experiment> Experiments { get; set; }

        }
        
        [HttpGet("data")]
        [ResponseCache(Duration = 0)] 
        public async Task<ActionResult> GetMessages()
        {
            var collection = _database.GetCollection<Participant>("Participants");
            var participants = await (await collection.FindAsync(x => true)).ToListAsync();
            var msg = new MessageAndData()
            {
                Messages = participants.SelectMany(x=> x.Messages).OrderByDescending(y=>y.Timestamp),
                Songs = participants.SelectMany(x=> x.MusicRequests).OrderByDescending(y=>y.Timestamp),
                Experiments = participants.SelectMany(x=> x.Experiments).OrderByDescending(y=>y.Timestamp)
            };
            
            
            return Ok(msg);

        }
        
        [HttpPost("songs")]
        public async Task<ActionResult> SendSong([FromBody] SongRequest model)
        {
            var collection = _database.GetCollection<Participant>("Participants");
            var participant = await (await collection.FindAsync(x => x.Id == model.ParticipantId)).FirstOrDefaultAsync();
            if (participant == null) return NotFound();
            
            var messageObj = new MusicRequest(){Song = model.Song};
            participant.MusicRequests = participant.MusicRequests.Append(messageObj);
            await collection.ReplaceOneAsync(x => x.Id == model.ParticipantId, participant);
            await _hubContext.Clients.All.SendAsync("Invalidate", "songs");

            return Ok(participant);

        }
        
        [HttpPost("experiments")]
        public async Task<ActionResult> SendExperiments([FromBody] ExperimentRequest model)
        {
            var collection = _database.GetCollection<Participant>("Participants");
            var participant = await (await collection.FindAsync(x => x.Id == model.ParticipantId)).FirstOrDefaultAsync();
            if (participant == null) return NotFound();
            
            var experiment = new Experiment(){Result = model.Result, Command = model.Command, Name = model.Name};
            participant.Experiments = participant.Experiments.Append(experiment);
            await collection.ReplaceOneAsync(x => x.Id == model.ParticipantId, participant);
            await _hubContext.Clients.All.SendAsync("Invalidate", "experiments");

            return Ok(participant);

        }
        
        
        [HttpPost("participants")]
        public async Task<ActionResult<Participant>> NewParticipants()
        {
            var joiningConnection = _database.GetCollection<JoiningConnection>("JoiningConnection");
            
            var options = new FindOneAndUpdateOptions<JoiningConnection, JoiningConnection>
            {
                IsUpsert = true,
                ReturnDocument = ReturnDocument.After
            };

            var counter = await joiningConnection.FindOneAndUpdateAsync(
                Builders<JoiningConnection>.Filter.Where(x => true),
                Builders<JoiningConnection>.Update
                    .Inc(x => x.LatestDisplayId, 1),
                new FindOneAndUpdateOptions<JoiningConnection>
                {
                    ReturnDocument = ReturnDocument.After,
                    IsUpsert = true
                });
            
            
            var collection = _database.GetCollection<Participant>("Participants");
            var participant = new Participant
            {
                DisplayIdentifier = counter.LatestDisplayId.ToString(),
                Metadata =
                {
                    ["User-Agent"] = Request.Headers["User-Agent"],
                    ["Accept-Language"] = Request.Headers["Accept-Language"]
                }
            };

            await collection.InsertOneAsync(participant);
            return Ok(participant);
        }
    }
}
