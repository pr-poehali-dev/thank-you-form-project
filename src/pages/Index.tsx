import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const Index = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/thank-you');
  };

  return (
    <div className="min-h-screen">
      <header className="border-b bg-white/80 backdrop-blur-sm fixed w-full z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Icon name="Building2" size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-secondary">Компания</span>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#about" className="text-muted-foreground hover:text-secondary transition-colors">О нас</a>
            <a href="#services" className="text-muted-foreground hover:text-secondary transition-colors">Услуги</a>
            <a href="#contact" className="text-muted-foreground hover:text-secondary transition-colors">Контакты</a>
          </nav>
        </div>
      </header>

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold text-secondary leading-tight">
                Профессиональные бизнес-решения
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Мы предоставляем качественные услуги для развития вашего бизнеса. 
                Индивидуальный подход к каждому клиенту и гарантия результата.
              </p>
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Award" size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-secondary">15+ лет</div>
                    <div className="text-sm text-muted-foreground">на рынке</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Users" size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-secondary">500+</div>
                    <div className="text-sm text-muted-foreground">клиентов</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white rounded-2xl shadow-2xl p-8 border">
                <h2 className="text-2xl font-bold text-secondary mb-6">Свяжитесь с нами</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ваше имя</Label>
                    <Input
                      id="name"
                      placeholder="Иван Иванов"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ivan@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+7 (999) 123-45-67"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Сообщение</Label>
                    <Textarea
                      id="message"
                      placeholder="Расскажите о вашем проекте..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="min-h-32"
                    />
                  </div>
                  <Button type="submit" className="w-full h-12 text-base" size="lg">
                    Отправить заявку
                    <Icon name="Send" size={18} className="ml-2" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-secondary mb-16">Наши услуги</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'Briefcase', title: 'Консалтинг', desc: 'Профессиональные консультации по развитию бизнеса' },
              { icon: 'TrendingUp', title: 'Аналитика', desc: 'Глубокий анализ и стратегическое планирование' },
              { icon: 'Shield', title: 'Безопасность', desc: 'Защита бизнес-процессов и данных компании' }
            ].map((service, i) => (
              <div 
                key={i} 
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-5">
                  <Icon name={service.icon as any} size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-secondary text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                  <Icon name="Building2" size={20} className="text-white" />
                </div>
                <span className="text-xl font-bold">Компания</span>
              </div>
              <p className="text-white/70">Профессиональные решения для вашего бизнеса</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <div className="space-y-2 text-white/70">
                <p>Email: info@company.ru</p>
                <p>Телефон: +7 (495) 123-45-67</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Режим работы</h4>
              <div className="space-y-2 text-white/70">
                <p>Пн-Пт: 9:00 - 18:00</p>
                <p>Сб-Вс: Выходной</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/70">
            © 2024 Компания. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
