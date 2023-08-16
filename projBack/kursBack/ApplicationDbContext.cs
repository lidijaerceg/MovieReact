using Microsoft.EntityFrameworkCore;
using projBack.Entities;
using System.Diagnostics.CodeAnalysis;

namespace projBack
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext([NotNullAttribute] DbContextOptions options) : base(options)
        {
        }

        public DbSet<Genre> Genres { get; set; }
    }
}
