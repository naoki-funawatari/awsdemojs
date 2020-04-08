USE [duty_times]
GO

/****** Object:  Table [dbo].[stamp_type]    Script Date: 2020/04/08 16:40:49 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[stamp_type](
	[stamp_type] [tinyint] NOT NULL,
	[title] [nvarchar](10) NULL,
 CONSTRAINT [PK_stamp_type] PRIMARY KEY CLUSTERED 
(
	[stamp_type] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


