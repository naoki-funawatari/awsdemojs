USE [duty_times]
GO

/****** Object:  Table [dbo].[users]    Script Date: 2020/04/08 16:34:47 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[users](
	[id] [char](7) NOT NULL,
	[password] [varchar](100) NOT NULL,
	[name] [nvarchar](50) NULL,
	[email] [varchar](100) NULL,
 CONSTRAINT [PK_users_1] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


