import "./StartNow.scss";

const StartNow = () => {
  return (
    <div className="start-now flexEvenly">
      <div>
        <h2>طريقك الأسهل لإجتياز الفحص الوطني الموحد</h2>
        <p>
          أصبح بإمكانك الحصول على اسئلة الامتحان الوطني بكل سهولة من مكان واحد
          فقط “اطلع - اختبر - احصل على النتيجة
        </p>
      </div>

      <a href="#specialists" className="w-100">
        <button>ابدأ الآن</button>
      </a>
    </div>
  );
};

export default StartNow;
