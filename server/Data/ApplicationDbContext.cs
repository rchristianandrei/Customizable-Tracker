using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }

    public DbSet<Tracker> Trackers { get; set; }

    public DbSet<TextboxComponent> TextboxComponents { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>()
            .HasKey(u => u.Email);

        modelBuilder.Entity<User>()
            .Property(u => u.Email)
            .HasMaxLength(255);

        modelBuilder.Entity<Tracker>()
        .HasOne(o => o.User)
        .WithMany(u => u.Trackers)
        .HasForeignKey(o => o.UserEmail);

        modelBuilder.Entity<TextboxComponent>()
        .HasOne(c => c.Tracker)
        .WithMany(t => t.Components)
        .HasForeignKey(c => c.TrackerId)
        .OnDelete(DeleteBehavior.Cascade);

        //modelBuilder.Entity<BaseComponent>().UseTptMappingStrategy();
    }
}
