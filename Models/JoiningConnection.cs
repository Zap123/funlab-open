using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace funlab.Models
{
    public class JoiningConnection
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public int LatestDisplayId { get; set; }
        public IEnumerable<ParticipantAudit> Audit { get; set; } = new List<ParticipantAudit>();
    }

    public class ParticipantAudit
    {
        public string ParticipantId { get; set; }
        public DateTime JoiningTime {get; set; } = DateTime.UtcNow;
    }
}