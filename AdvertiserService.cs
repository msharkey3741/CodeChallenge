using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace Sabio.Services
{
    public class AdvertiserService : IAdvertiserService
    {

        IDataProvider _data = null;

        public AdvertiserService(IDataProvider data)
        {
            _data = data;
        }

        public int Add(AdvertiserAddRequest model)
        {
            int id = 0;

            string procName = "[dbo].[Advertisers_Insert]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@ShortTitle", model.ShortTitle);
                    col.AddWithValue("@Title", model.Title);
                    col.AddWithValue("@ShortDescription", model.ShortDescription);
                    col.AddWithValue("@Content", model.Content);
                    col.AddWithValue("@Slug", model.Slug);
                    col.AddWithValue("@EntityTypeId", model.EntityTypeId);
                    col.AddWithValue("@StatusId", model.StatusId);
                    col.AddWithValue("@DateStart", model.DateStart);
                    col.AddWithValue("@DateEnd", model.DateEnd);
                    col.AddWithValue("@Latitude", model.Latitude);
                    col.AddWithValue("@Longitude", model.Longitude);
                    col.AddWithValue("@ZipCode", model.ZipCode);
                    col.AddWithValue("@Address", model.Address);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    col.Add(idOut);
                }, returnParameters: delegate (SqlParameterCollection returnCol)
                {
                    object oId = returnCol["@Id"].Value;
                    int.TryParse(oId.ToString(), out id);
                });
            return id;
        }
        public Paged<Advertisers> GetAllByPagination(int pageIndex, int pageSize)
        {
            Paged<Advertisers> pagedResult = null;

            List<Advertisers> result = null;

            int totalCount = 0;

            _data.ExecuteCmd(
                "[dbo].[Advert_SelectAll]",
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {

                    Advertisers advert = MapAdvert(reader);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(14);
                    }

                    if (result == null)
                    {
                        result = new List<Advertisers>();
                    }

                    result.Add(advert);
                }
            );
            if (result != null)
            {
                pagedResult = new Paged<Advertisers>(result, pageIndex, pageSize, totalCount);
            }

            return pagedResult;
        }
        public Advertisers GetById(int id)
        {
            string procName = "[dbo].[Advert_ById]";

            Advertisers location = null;
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {

                paramCollection.AddWithValue("@Id", id);


            }, delegate (IDataReader reader, short set)
            {
                location = MapAdvert(reader);
            }

            );
            return location;
        }

        private static Advertisers MapAdvert(IDataReader reader)
        {
            Advertisers advertisers = new Advertisers();
            int i = 0;
            advertisers.Id = reader.GetSafeInt32(i++);
            advertisers.ShortTitle = reader.GetSafeString(i++);
            advertisers.Title = reader.GetSafeString(i++);
            advertisers.ShortDescription = reader.GetSafeString(i++);
            advertisers.Content = reader.GetSafeString(i++);
            advertisers.Slug = reader.GetSafeString(i++);
            advertisers.EntityTypeId = reader.GetSafeInt32(i++);
            advertisers.StatusId = reader.GetSafeBool(i++);
            advertisers.DateStart = reader.GetSafeDateTime(i++);
            advertisers.DateEnd = reader.GetSafeDateTime(i++);
            advertisers.Latitude = reader.GetSafeDouble(i++);
            advertisers.Longitude = reader.GetSafeDouble(i++);
            advertisers.ZipCode = reader.GetSafeString(i++);
            advertisers.Address = reader.GetSafeString(i++);

            return advertisers;
        }
    }
}
