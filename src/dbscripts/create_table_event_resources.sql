USE [duty_times]
GO

/****** Object:  Table [dbo].[event_resources]    Script Date: 2020/04/13 1:51:56 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[event_resources](
	[event_id] [int] NOT NULL,
	[resource_id] [int] NOT NULL,
 CONSTRAINT [PK_event_resources] PRIMARY KEY CLUSTERED 
(
	[event_id] ASC,
	[resource_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


