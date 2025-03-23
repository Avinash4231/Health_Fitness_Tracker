IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
CREATE TABLE [Users] (
    [UserId] int NOT NULL IDENTITY,
    [FullName] nvarchar(100) NOT NULL,
    [Email] nvarchar(100) NOT NULL,
    [PasswordHash] nvarchar(max) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [Gender] nvarchar(10) NOT NULL,
    [Height] decimal(18,2) NOT NULL,
    [Weight] decimal(18,2) NOT NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY ([UserId])
);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20250314075335_InitialCreate', N'9.0.3');

CREATE TABLE [UserWorkouts] (
    [WorkOutId] int NOT NULL IDENTITY,
    [UserId] int NOT NULL,
    [WorkOutType] nvarchar(20) NOT NULL,
    [DurationMinutes] int NOT NULL,
    [CaloriesBurned] int NOT NULL,
    [WorkoutDate] datetime2 NOT NULL,
    CONSTRAINT [PK_UserWorkouts] PRIMARY KEY ([WorkOutId]),
    CONSTRAINT [FK_UserWorkouts_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([UserId]) ON DELETE CASCADE
);

CREATE TABLE [ProgressTrackings] (
    [ProgressId] int NOT NULL IDENTITY,
    [UserId] int NOT NULL,
    [WeightKG] decimal(18,2) NOT NULL,
    [BMI] decimal(18,2) NULL,
    [BodyFatPercentage] decimal(18,2) NULL,
    [CheckingDate] datetime2 NOT NULL,
    CONSTRAINT [PK_ProgressTrackings] PRIMARY KEY ([ProgressId]),
    CONSTRAINT [FK_ProgressTrackings_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([UserId]) ON DELETE CASCADE
);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20250314092435_AddUserWorkoutAndProgressTracking', N'9.0.3');

ALTER TABLE [Users] ADD [SessionKey] nvarchar(max) NULL;

CREATE TABLE [ProgressTracking] (
    [ProgressId] int NOT NULL IDENTITY,
    [UserId] int NOT NULL,
    [WeightKG] decimal(18,2) NOT NULL,
    [BMI] decimal(18,2) NULL,
    [BodyFatPercentage] decimal(18,2) NULL,
    [CheckingDate] datetime2 NOT NULL,
    CONSTRAINT [PK_ProgressTracking] PRIMARY KEY ([ProgressId])
);

CREATE TABLE [UserWorkout] (
    [WorkOutId] int NOT NULL IDENTITY,
    [UserId] int NOT NULL,
    [WorkOutType] nvarchar(20) NOT NULL,
    [DurationMinutes] int NOT NULL,
    [CaloriesBurned] int NOT NULL,
    [WorkoutDate] datetime2 NOT NULL,
    CONSTRAINT [PK_UserWorkout] PRIMARY KEY ([WorkOutId])
);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20250320041948_MigrationName', N'9.0.3');

COMMIT;
GO

