import { useState, useEffect } from 'react';
import { Copy, Check, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const widgetCode = `<!-- НАЧАЛО КОДА ВИДЖЕТА -->
<style>
.thank-you-overlay{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:9999;animation:tyFadeIn 0.3s ease}.thank-you-overlay.active{display:flex;justify-content:center;align-items:center;padding:16px}.thank-you-content{background:#fff;border-radius:16px;max-width:600px;width:100%;padding:32px 24px;position:relative;animation:tySlideUp 0.3s ease;box-shadow:0 20px 60px rgba(0,0,0,0.3);max-height:90vh;overflow-y:auto}@media(min-width:640px){.thank-you-content{padding:48px 32px}}.thank-you-close{position:absolute;top:12px;right:12px;background:none;border:none;font-size:28px;cursor:pointer;color:#999;padding:8px;line-height:1;width:40px;height:40px;border-radius:50%;transition:all 0.2s}.thank-you-close:hover{color:#333;background:#f1f5f9}.thank-you-check{width:80px;height:80px;margin:0 auto 24px;background:linear-gradient(135deg,#0EA5E9,#0EA5E9);border-radius:50%;display:flex;align-items:center;justify-content:center;animation:tyScaleIn 0.3s ease;box-shadow:0 10px 30px rgba(14,165,233,0.3)}@media(min-width:640px){.thank-you-check{width:100px;height:100px;margin-bottom:32px}}@media(min-width:768px){.thank-you-check{width:120px;height:120px}}.thank-you-check svg{width:48px;height:48px}@media(min-width:640px){.thank-you-check svg{width:60px;height:60px}}@media(min-width:768px){.thank-you-check svg{width:80px;height:80px}}.thank-you-check path{stroke-dasharray:100;stroke-dashoffset:100;animation:tyDrawCheck 0.5s ease forwards 0.3s}.thank-you-title{font-size:20px;font-weight:700;color:#1e293b;text-align:center;margin:0 0 12px;font-family:'Montserrat',sans-serif;padding:0 16px}@media(min-width:640px){.thank-you-title{font-size:24px;margin-bottom:16px}}@media(min-width:768px){.thank-you-title{font-size:28px}}.thank-you-subtitle{font-size:18px;font-weight:600;color:#0EA5E9;text-align:center;margin:0 0 20px;padding:0 16px}@media(min-width:640px){.thank-you-subtitle{font-size:20px;margin-bottom:24px}}@media(min-width:768px){.thank-you... [truncated]
</style>

<div id="thankYouWidget" class="thank-you-overlay">
    <div class="thank-you-content">
        <button class="thank-you-close" onclick="closeTYWidget()">&times;</button>
        <div id="tyMainMsg">
            <div class="thank-you-check">
                <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 25L20 35L40 15" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <h2 class="thank-you-title">Уважаемый клиент!</h2>
            <p class="thank-you-subtitle">Ваша заявка на займ принята</p>
            <div class="thank-you-line"></div>
            <p class="thank-you-text">Наши специалисты свяжутся с вами с номера телефона</p>
            <a href="tel:+74951178567" class="thank-you-phone">+7 (495) 117-85-67</a>
            <div class="thank-you-timer">
                <p class="thank-you-timer-label">Ожидаемое время звонка</p>
                <div id="tyTimer" class="thank-you-timer-display">30:00</div>
            </div>
        </div>
        <div id="tySecondMsg" style="display:none;text-align:center;padding:20px 0">
            <h2 class="thank-you-title">Обработка заявки</h2>
            <div class="thank-you-line"></div>
            <p class="thank-you-text">Наши сотрудники свяжутся с вами, как обработают вашу заявку</p>
        </div>
    </div>
</div>

<script>
(function(){var t,s=1800;function o(){document.getElementById("thankYouWidget").classList.add("active"),document.body.style.overflow="hidden",s=1800,document.getElementById("tyMainMsg").style.display="block",document.getElementById("tySecondMsg").style.display="none",e()}function i(){document.getElementById("thankYouWidget").classList.remove("active"),document.body.style.overflow="",t&&clearInterval(t)}function e(){t&&clearInterval(t),n(),t=setInterval(function(){if(--s<=0)return clearInterval(t),void function(){document.getElementById("tyMainMsg").style.display="none",document.getElementById("tySecondMsg").style.display="block"}();n()},1e3)}function n(){var t=Math.floor(s/60),e=s%60,o=String(t).padStart(2,"0")+":"+String(e).padStart(2,"0");document.getElementById("tyTimer").textContent=o}window.openTYWidget=o,window.closeTYWidget=i,document.getElementById("thankYouWidget").addEventListener("click",function(t){t.target===this&&i()}),document.addEventListener("keydown",function(t){"Escape"===t.key&&i()})})();
</script>
<!-- КОНЕЦ КОДА ВИДЖЕТА -->`;

const WidgetCode = () => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800);
  const [showSecondMessage, setShowSecondMessage] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setShowSecondMessage(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(widgetCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Назад на главную</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 animate-slide-up">
          {!showSecondMessage ? (
            <>
              <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 sm:mb-8 bg-gradient-to-br from-sky-400 to-sky-500 rounded-full flex items-center justify-center shadow-lg animate-scale-in">
                <svg
                  viewBox="0 0 50 50"
                  fill="none"
                  className="w-12 h-12 sm:w-16 sm:h-16"
                >
                  <path
                    d="M10 25L20 35L40 15"
                    stroke="white"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-draw-check"
                  />
                </svg>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-3 sm:mb-4">
                Уважаемый клиент!
              </h2>
              <p className="text-xl sm:text-2xl font-semibold text-sky-500 text-center mb-6">
                Ваша заявка на займ принята
              </p>

              <div className="w-20 sm:w-24 h-1 bg-sky-500 rounded-full mx-auto mb-6 sm:mb-8"></div>

              <p className="text-slate-600 text-center mb-4 text-base sm:text-lg">
                Наши специалисты свяжутся с вами с номера телефона
              </p>

              <a
                href="tel:+74951178567"
                className="block text-2xl sm:text-3xl font-bold text-sky-500 hover:text-sky-600 transition-colors text-center mb-6 sm:mb-8"
              >
                +7 (495) 117-85-67
              </a>

              <div className="bg-gradient-to-r from-sky-500 to-sky-600 rounded-2xl p-6 sm:p-8 text-center shadow-xl max-w-sm mx-auto">
                <p className="text-xs sm:text-sm text-white/90 mb-2 uppercase tracking-wide">
                  Ожидаемое время звонка
                </p>
                <div className="text-4xl sm:text-5xl font-bold text-white font-mono tracking-wider">
                  {formatTime(timeLeft)}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8 animate-fade-in">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                Обработка заявки
              </h2>
              <div className="w-20 sm:w-24 h-1 bg-sky-500 rounded-full mx-auto mb-6"></div>
              <p className="text-slate-600 text-base sm:text-lg">
                Наши сотрудники свяжутся с вами, как обработают вашу заявку
              </p>
            </div>
          )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900">
                  Код для встраивания
                </h2>
                <Button onClick={copyToClipboard} size="sm" className="flex items-center gap-2">
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Скопировано!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Копировать
                    </>
                  )}
                </Button>
              </div>
              <p className="text-sm text-slate-600 mb-4">
                Вставьте перед &lt;/body&gt; на вашей странице
              </p>
              <div className="relative">
                <pre className="bg-slate-50 border-2 border-slate-200 rounded-xl p-4 overflow-x-auto text-xs font-mono text-slate-800 max-h-[300px] overflow-y-auto">
                  {widgetCode}
                </pre>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-sky-50 border-2 border-sky-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-sky-900 mb-3">
                Использование
              </h3>
              <p className="text-slate-700 text-sm mb-3">
                Чтобы открыть окно благодарности:
              </p>
              <code className="block bg-white px-4 py-3 rounded-lg text-sky-700 font-mono text-sm border border-sky-200">
                openTYWidget();
              </code>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-amber-900 mb-3">
                Пример для формы
              </h3>
              <pre className="bg-white px-4 py-3 rounded-lg text-amber-800 font-mono text-xs overflow-x-auto border border-amber-200">
{`<form onsubmit="
  event.preventDefault();
  openTYWidget();
">
  <button type="submit">
    Отправить
  </button>
</form>`}
            </pre>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-emerald-900 mb-4">
              Интеграция с Tilda
            </h3>
            <ol className="space-y-3 text-slate-700 text-sm">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                  1
                </span>
                <span>Откройте настройки страницы в Tilda</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                  2
                </span>
                <span>Перейдите в "Еще" → "HTML-код для сайта"</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                  3
                </span>
                <span>Вставьте код в поле "Before &lt;/body&gt;"</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                  4
                </span>
                <span>
                  В настройках формы добавьте callback:{' '}
                  <code className="bg-white px-2 py-1 rounded text-emerald-700 font-mono text-xs">
                    openTYWidget();
                  </code>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                  5
                </span>
                <span>Сохраните и опубликуйте</span>
              </li>
            </ol>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-purple-200 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-purple-900 mb-4 flex items-center gap-2">
              <span>✨</span>
              Особенности виджета
            </h3>
            <ul className="space-y-2 text-slate-700 text-sm">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                <span>Полностью адаптивный дизайн</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                <span>Минимальный размер кода</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                <span>Анимированная галочка</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                <span>Таймер обратного отсчёта 30 минут</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                <span>Автоматическая смена сообщения</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                <span>Кликабельный телефон</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                <span>Закрытие по ESC или клику вне окна</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                <span>Не конфликтует с другими скриптами</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes scale-in {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes draw-check {
          from { stroke-dashoffset: 100; }
          to { stroke-dashoffset: 0; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease;
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease;
        }
        .animate-draw-check {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: draw-check 0.5s ease forwards 0.3s;
        }
      `}</style>
    </div>
  );
};

export default WidgetCode;