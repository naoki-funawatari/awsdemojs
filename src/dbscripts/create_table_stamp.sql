USE [duty_times]
GO

/****** Object:  Table [dbo].[stamp]    Script Date: 2020/04/08 16:35:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[stamp](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [char](7) NOT NULL,
	[date] [date] NOT NULL,
	[type] [tinyint] NOT NULL,
	[time] [datetime] NOT NULL,
 CONSTRAINT [PK_stamp] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


