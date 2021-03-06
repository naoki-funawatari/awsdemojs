USE [duty_times]
GO

/****** Object:  Table [dbo].[events]    Script Date: 2020/04/16 11:13:09 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[events](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[title] [nvarchar](50) NOT NULL,
	[all_day] [bit] NOT NULL,
	[start] [datetime] NOT NULL,
	[end] [datetime] NOT NULL,
	[color] [char](7) NOT NULL,
 CONSTRAINT [PK_events] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


