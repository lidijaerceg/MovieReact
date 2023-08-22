using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using projBack.DTOs;
using projBack.Entities;
using System.Diagnostics.CodeAnalysis;

namespace projBack
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<MoviesGenres>()
                .HasKey(x => new { x.GenreId, x.MovieId });

            modelBuilder.Entity<PersonalInformation>()
                .HasOne(pi => pi.User)
                .WithMany()
                .HasForeignKey(pi => pi.UserId);

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Genre> Genres { get; set; }

        public DbSet<Movie> Movies { get; set; }
        public DbSet<MoviesGenres> MoviesGenres { get; set; }
        public DbSet<PersonalInformation> PersonalInformation { get; set; }
        //public DbSet<UserCredentialsRegistration> UserCredentialsRegistration { get; set; }
    }
}
