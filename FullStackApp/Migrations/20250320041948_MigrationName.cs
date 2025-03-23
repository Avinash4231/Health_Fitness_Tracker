using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FullStackApp.Migrations
{
    /// <inheritdoc />
    public partial class MigrationName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SessionKey",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ProgressTracking",
                columns: table => new
                {
                    ProgressId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    WeightKG = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    BMI = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    BodyFatPercentage = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    CheckingDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProgressTracking", x => x.ProgressId);
                });

            migrationBuilder.CreateTable(
                name: "UserWorkout",
                columns: table => new
                {
                    WorkOutId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    WorkOutType = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    DurationMinutes = table.Column<int>(type: "int", nullable: false),
                    CaloriesBurned = table.Column<int>(type: "int", nullable: false),
                    WorkoutDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserWorkout", x => x.WorkOutId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProgressTracking");

            migrationBuilder.DropTable(
                name: "UserWorkout");

            migrationBuilder.DropColumn(
                name: "SessionKey",
                table: "Users");
        }
    }
}
