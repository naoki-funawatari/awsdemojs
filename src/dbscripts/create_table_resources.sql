USE [duty_times]
GO

/****** Object:  Table [dbo].[resources]    Script Date: 2020/04/16 20:49:44 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[resources](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[title] [nvarchar](20) NOT NULL,
	[resource_type_id] [int] NOT NULL,
	[remarks] [nvarchar](50) NULL,
	[deleted] [datetime] NULL,
 CONSTRAINT [PK_resources] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


