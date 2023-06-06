using System.Threading.Tasks;
using MongoDB.Driver;

namespace funlab
{
    public interface IMongoContext
    {
        public bool TransactionSupport { get; }

        IMongoCollection<T> GetCollection<T>(string collectionName);
        Task<IClientSessionHandle> StartSession();
    }
}