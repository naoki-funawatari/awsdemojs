USE [duty_times]
GO

/****** Object:  Table [dbo].[resource_type]    Script Date: 2020/04/16 20:52:22 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[resource_type](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[title] [nvarchar](20) NOT NULL,
 CONSTRAINT [PK_resource_type] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


