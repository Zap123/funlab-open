using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace funlab.Hubs
{
    public class InteractiveHub:Hub
    {
        public async Task Command(string message)
        {
            await Clients.All.SendAsync("Command", message);
        }
        
        public async Task Invalidate(string resource)
        {
            await Clients.All.SendAsync("Invalidate", resource);
        }
    }
}