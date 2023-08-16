using AutoMapper;
using projBack.DTOs;
using projBack.Entities;

namespace projBack.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<GenreDTO, Genre>().ReverseMap();
            CreateMap<GenreCreationDTO, Genre>();
        }
    }
}
