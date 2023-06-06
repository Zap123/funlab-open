using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace funlab.Models
{
    public class Participant
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string DisplayIdentifier { get; set; }
        public string ConnectionId { get; set; }
        public IEnumerable<Message> Messages { get; set; } = new List<Message>();
        public IEnumerable<MusicRequest> MusicRequests { get; set; } = new List<MusicRequest>();
        public IEnumerable<Experiment> Experiments { get; set; } = new List<Experiment>();
        public IEnumerable<Event> Events { get; set; } = new List<Event>();
        public Dictionary<string, string> Metadata { get; set; } = new Dictionary<string, string>();
    }

    public class Event
    {
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public string Action { get; set; }
    }

    public class MusicRequest
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public string Song { get; set; }
    }
    
    public class Experiment
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public string Result { get; set; }
        public string Command { get; set; }
        public string Name { get; set; }
    }


    public class Message
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public string Text { get; set; }
    }
}