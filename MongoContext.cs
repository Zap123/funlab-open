using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

namespace funlab
{
    public class MongoContext : IMongoContext
    {
        private readonly IMongoClient _client;
        private readonly IMongoDatabase _database;

        public MongoContext(string connectionString, string databaseName, bool transactionSupport)
        {
            TransactionSupport = transactionSupport;
            // Set Guid format
            BsonDefaults.GuidRepresentation = GuidRepresentation.Standard;

            _client = new MongoClient(connectionString);

            // Database conventions
            SetUpConventions();

            _database = _client.GetDatabase(databaseName);
        }

        public bool TransactionSupport { get; }

        public IMongoCollection<T> GetCollection<T>(string collectionName) 
        {
            return _database.GetCollection<T>(collectionName);
        }

        public async Task<IClientSessionHandle> StartSession()
        {
            return await _client.StartSessionAsync();
        }

        private static void SetUpConventions()
        {
            var pack = new ConventionPack
            {
                // Enum as string
                new EnumRepresentationConvention(BsonType.String),
                // Serialize immutable types for DDD
                new ImmutableTypeClassMapConvention(),
                new StringIdStoredAsObjectIdConvention()
                
            };
            
            ConventionRegistry.Register("Conventions", pack, _ => true);
        }
    }
}