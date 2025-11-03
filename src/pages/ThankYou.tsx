import { useEffect, useState } from 'react';

const ThankYou = () => {
  const [showContent, setShowContent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [showSecondMessage, setShowSecondMessage] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 100);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setShowSecondMessage(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setShowSecondMessage(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (showSecondMessage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-white rounded-2xl shadow-2xl p-12 space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-secondary">Обработка заявки</h1>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Наши сотрудники свяжутся с вами, как обработают вашу заявку
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <div className={`max-w-2xl w-full text-center transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="bg-white rounded-2xl shadow-2xl p-12 space-y-8">
          <div className="relative inline-block">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-primary rounded-full flex items-center justify-center animate-scale-in">
              <svg 
                className="w-20 h-20 text-white" 
                viewBox="0 0 50 50" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M10 25L20 35L40 15" 
                  stroke="currentColor" 
                  strokeWidth="5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  strokeDasharray="100"
                  className="animate-check-draw"
                />
              </svg>
            </div>
            <div className="absolute inset-0 w-32 h-32 mx-auto bg-primary/20 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
          </div>

          <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h1 className="text-3xl font-bold text-secondary">Уважаемый клиент!</h1>
            <p className="text-2xl font-semibold text-primary">Ваша заявка на займ принята</p>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Наши специалисты свяжутся с вами с номера телефона
            </p>
            <a 
              href="tel:+74951178567" 
              className="text-3xl font-bold text-primary hover:text-primary/80 transition-colors inline-block"
            >
              +7 (495) 117-85-67
            </a>

            <div className="pt-6">
              <div className="inline-block bg-gradient-to-br from-primary to-primary/80 text-white rounded-2xl px-8 py-6 shadow-lg">
                <p className="text-sm mb-2 opacity-90">Ожидаемое время звонка</p>
                <div className="text-5xl font-bold font-mono tracking-wider">
                  {formatTime(timeLeft)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
