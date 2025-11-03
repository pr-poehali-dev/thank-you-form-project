import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const ThankYou = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <div className={`max-w-2xl w-full text-center transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="bg-white rounded-2xl shadow-2xl p-12 space-y-8">
          <div className="relative inline-block">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center animate-scale-in">
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
            <h1 className="text-4xl font-bold text-secondary">Спасибо за вашу заявку!</h1>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="space-y-3 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <p className="text-xl text-muted-foreground">
              Ваша заявка успешно принята
            </p>
            <p className="text-lg text-muted-foreground">
              Наши специалисты свяжутся с вами в ближайшее время
            </p>
          </div>

          <div className="pt-4 animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <Link to="/">
              <Button size="lg" className="gap-2 text-lg px-8 py-6">
                <Icon name="Home" size={20} />
                Вернуться на главную
              </Button>
            </Link>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mt-6 animate-fade-in" style={{ animationDelay: '0.9s' }}>
          Обычно мы отвечаем в течение 24 часов
        </p>
      </div>
    </div>
  );
};

export default ThankYou;
