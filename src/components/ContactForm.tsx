import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Имитация отправки
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Сообщение успешно отправлено!");

    // Очищаем форму
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: "Mail",
      title: "Email",
      value: "hello@photosite.com",
      description: "Ответим в течение 24 часов",
    },
    {
      icon: "Phone",
      title: "Телефон",
      value: "+7 (999) 123-45-67",
      description: "Пон-Пят с 9:00 до 18:00",
    },
    {
      icon: "MapPin",
      title: "Офис",
      value: "Москва, Россия",
      description: "По предварительной записи",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Связаться с нами
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Остались вопросы по обработке фотографий или требуется поддержка?
          Напишите нам, и мы обязательно ответим!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Контактная информация */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Контактная информация
          </h3>

          {contactInfo.map((info, index) => (
            <Card key={index} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-3 rounded-full">
                  <Icon
                    name={info.icon}
                    size={24}
                    className="text-purple-600"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {info.title}
                  </h4>
                  <p className="text-lg text-purple-600 font-medium mb-1">
                    {info.value}
                  </p>
                  <p className="text-sm text-gray-500">{info.description}</p>
                </div>
              </div>
            </Card>
          ))}

          {/* Социальные сети */}
          <Card className="p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Мы в соцсетях</h4>
            <div className="flex gap-4">
              {[
                { icon: "Instagram", color: "from-pink-500 to-orange-500" },
                { icon: "Twitter", color: "from-blue-400 to-blue-600" },
                { icon: "Facebook", color: "from-blue-600 to-blue-800" },
                { icon: "Linkedin", color: "from-blue-700 to-blue-900" },
              ].map((social, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant="outline"
                  className="hover:shadow-md transition-all duration-300"
                >
                  <Icon
                    name={social.icon}
                    size={16}
                    className={`bg-gradient-to-r ${social.color} bg-clip-text text-transparent`}
                  />
                </Button>
              ))}
            </div>
          </Card>
        </div>

        {/* Форма обратной связи */}
        <Card className="p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Отправить сообщение
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Имя *
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  placeholder="Ваше имя"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="subject"
                className="text-sm font-medium text-gray-700"
              >
                Тема сообщения *
              </Label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                placeholder="О чём вы хотите спросить?"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="message"
                className="text-sm font-medium text-gray-700"
              >
                Сообщение *
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="border-gray-300 focus:border-purple-500 focus:ring-purple-500 resize-none"
                placeholder="Опишите ваш вопрос или проблему подробнее..."
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <Icon
                    name="Loader2"
                    size={20}
                    className="mr-2 animate-spin"
                  />
                  Отправляем...
                </>
              ) : (
                <>
                  <Icon name="Send" size={20} className="mr-2" />
                  Отправить сообщение
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Icon name="Shield" size={16} className="text-purple-600" />
              Ваши данные в безопасности и не будут переданы третьим лицам
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ContactForm;
