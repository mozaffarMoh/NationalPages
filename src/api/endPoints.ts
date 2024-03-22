export const endPoint: any = {

    /* Admin Paths */
    adminLogin: '/admin/log-in',
    adminLogout: '/admin/log-out',
    adminRegister: '/admin/make-account',
    sendNotify: '/admin/send-notify',
    showUsers: '/admin/show-users',
    generateCode: '/admin/generate-code',
    showAds: '/admin/sliders',
    addAds: '/admin/add-slider',
    deleteAds: '/admin/delete-slider?id=',
    suggestions: '/admin/show-suggestions',
    deleteSuggestions: '/admin/delete-suggestions?suggestion_id=',
    adminColleges: '/admin/colleges',
    addCollege: '/admin/add-college',
    adminSpecialists: '/admin/specialties?college_id=',
    addSpecialist: '/admin/add-specialty',
    editSpecialist: '/admin/update-specialty',
    adminSubjects: '/admin/subjects?college_id=',
    addSubject: '/admin/add-subject',
    editSubject: '/admin/update-subject',
    adminExams: '/admin/exams?college_id=',
    addExam: '/admin/add-exam',
    allQuestions: '/admin/show-questions?exam_id=',
    addQuestion: '/admin/add-question',
    editQuestion: '/admin/update-question',



    /* User Paths */
    login: "/user/login",
    register: "/user/register",
    logout: "/user/logout",
    sliders: '/sliders',
    colleges: '/colleges',
    collegeSpeciality: '/college/specialty',
    collegeSubject: '/college/subject',
    dawrat: '/user/exams/show',
    quizByExam: "/user/exams/exam",
    quizByBook: "/user/exams/book",
    quizBySubject: "/user/exams/subject",
    quizByDegree: "/user/exams/show",
    calculate: "/user/exams/calculate",
    showProfile: "/user/profile",
    editProfile: "/user/profile/update"
}