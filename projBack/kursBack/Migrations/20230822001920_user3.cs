using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace projBack.Migrations
{
    /// <inheritdoc />
    public partial class user3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           

                

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "PersonalInformation",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "PersonalInformation",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Username",
                table: "PersonalInformation",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "UserCredentials");

            migrationBuilder.DropColumn(
                name: "DateOfBirth",
                table: "UserCredentials");

            migrationBuilder.DropColumn(
                name: "Lastname",
                table: "UserCredentials");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "UserCredentials");

            migrationBuilder.DropColumn(
                name: "PictureURL",
                table: "UserCredentials");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "PersonalInformation");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "PersonalInformation");

            migrationBuilder.DropColumn(
                name: "Username",
                table: "PersonalInformation");
        }
    }
}
