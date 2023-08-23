using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace projBack.Migrations
{
    /// <inheritdoc />
    public partial class role : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "PersonalInformation",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Role",
                table: "UserCredentials");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "PersonalInformation");
        }
    }
}
