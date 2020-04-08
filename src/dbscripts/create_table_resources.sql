USE [duty_times]
GO

/****** Object:  Table [dbo].[resources]    Script Date: 2020/04/08 16:29:02 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[resources](
	[id] [int] NOT NULL,
	[title] [nvarchar](20) NOT NULL,
 CONSTRAINT [PK_resources] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


