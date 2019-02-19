import Mock from 'mockjs'

const ChapterData = [
    {
        "chapterName": "第一章",
        "chapter": 1,
        "chapterId": 1
    },
    {
        "chapterName": "第二章",
        "chapter": 2,
        "chapterId": 2
    },
    {
        "chapterName": "第三章",
        "chapter": 3,
        "chapterId": 3
    },
    {
        "chapterName": "第四章",
        "chapter": 4,
        "chapterId": 4
    },
    {
        "chapterName": "第五章",
        "chapter": 5,
        "chapterId": 5
    }
]

const SectionData = [
    {
        "explanationId": 1,
        "section": 1,
        "isRead": "1",
        "name": "第一节"
    },
    {
        "explanationId": 2,
        "section": 2,
        "isRead": "2",
        "name": "第二节"
    },
    {
        "explanationId": 3,
        "section": 3,
        "isRead": "1",
        "name": "第三节"
    },{
        "explanationId": 4,
        "section": 4,
        "isRead": "1",
        "name": "第四节"
    },{
        "explanationId": 5,
        "section": 5,
        "isRead": "2",
        "name": "第五节"
    }
]

Mock.mock('/api/zqjtjx/common/explanation/getChapter',{
    message: '成功',
    status: 300,
    data: ChapterData
})

Mock.mock('/api/zqjtjx/common/explanation/getExplanation',{
    message: '成功',
    status: 300,
    data: SectionData
})