import { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ThankYouModal = ({ isOpen, onClose }: ThankYouModalProps) => {
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [showSecondMessage, setShowSecondMessage] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setTimeLeft(30 * 60);
      setShowSecondMessage(false);
      return;
    }

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
  }, [timeLeft, isOpen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        {showSecondMessage ? (
          <div className="p-6 sm:p-8 md:p-12 space-y-4 sm:space-y-6 text-center">
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary px-4">Обработка заявки</h2>
              <div className="w-20 sm:w-24 h-1 bg-primary mx-auto rounded-full"></div>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed px-4">
              Наши сотрудники свяжутся с вами, как обработают вашу заявку
            </p>
          </div>
        ) : (
          <div className="p-6 sm:p-8 md:p-12 space-y-5 sm:space-y-6 md:space-y-8">
            <div className="relative w-full flex justify-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-primary to-primary rounded-full flex items-center justify-center animate-scale-in shadow-lg">
                <svg 
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 text-white" 
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
            </div>

            <div className="space-y-2 sm:space-y-3 md:space-y-4 text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary px-2">Уважаемый клиент!</h2>
              <p className="text-lg sm:text-xl md:text-2xl font-semibold text-primary px-2">Ваша заявка на займ принята</p>
              <div className="w-20 sm:w-24 h-1 bg-primary mx-auto rounded-full"></div>
            </div>

            <div className="space-y-3 sm:space-y-4 md:space-y-6 text-center">
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed px-4">
                Наши специалисты свяжутся с вами с номера телефона
              </p>
              <a 
                href="tel:+74951178567" 
                className="block text-xl sm:text-2xl md:text-3xl font-bold text-primary hover:text-primary/80 transition-colors px-4 py-2"
              >
                +7 (495) 117-85-67
              </a>

              <div className="pt-2 sm:pt-4 md:pt-6">
                <div className="inline-block bg-gradient-to-br from-primary to-primary/80 text-white rounded-xl md:rounded-2xl px-5 py-3 sm:px-6 sm:py-4 md:px-8 md:py-6 shadow-lg w-full max-w-xs mx-auto">
                  <p className="text-xs sm:text-sm mb-1 sm:mb-2 opacity-90">Ожидаемое время звонка</p>
                  <div className="text-2xl sm:text-3xl md:text-5xl font-bold font-mono tracking-wide sm:tracking-wider">
                    {formatTime(timeLeft)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ThankYouModal;