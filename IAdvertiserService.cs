using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;

namespace Sabio.Services
{
    public interface IAdvertiserService
    {
        int Add(AdvertiserAddRequest model);
        Paged<Advertisers> GetAllByPagination(int pageIndex, int pageSize);
        Advertisers GetById(int id);

    }
}