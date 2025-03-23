using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FullStackApp.Migrations
{
    /// <inheritdoc />
    public partial class AddUserWorkoutAndProgressTracking : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserWorkouts",
                columns: table => new
                {
                    WorkOutId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(nullable: false),
                    WorkOutType = table.Column<string>(maxLength: 20, nullable: false),
                    DurationMinutes = table.Column<int>(nullable: false),
                    CaloriesBurned = table.Column<int>(nullable: false),
                    WorkoutDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserWorkouts", x => x.WorkOutId);
                    table.ForeignKey(
                        name: "FK_UserWorkouts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProgressTrackings",
                columns: table => new
                {
                    ProgressId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(nullable: false),
                    WeightKG = table.Column<decimal>(nullable: false),
                    BMI = table.Column<decimal>(nullable: true),
                    BodyFatPercentage = table.Column<decimal>(nullable: true),
                    CheckingDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProgressTrackings", x => x.ProgressId);
                    table.ForeignKey(
                        name: "FK_ProgressTrackings_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserWorkouts");

            migrationBuilder.DropTable(
                name: "ProgressTrackings");
        }

    }
}
