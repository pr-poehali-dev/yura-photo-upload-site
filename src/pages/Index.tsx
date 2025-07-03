import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import PhotoUpload from "@/components/PhotoUpload";
import PhotoGallery from "@/components/PhotoGallery";
import ContactForm from "@/components/ContactForm";

const Index = () => {
  const [activeSection, setActiveSection] = useState("upload");

  const navigation = [
    { id: "upload", label: "Главная", icon: "Upload" },
    { id: "gallery", label: "Галерея", icon: "Images" },
    { id: "contact", label: "Контакты", icon: "Mail" },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "upload":
        return <PhotoUpload />;
      case "gallery":
        return <PhotoGallery />;
      case "contact":
        return <ContactForm />;
      default:
        return <PhotoUpload />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Шапка */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-xl">
                <Icon name="Camera" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                PhotoPro
              </h1>
            </div>

            <nav className="flex items-center gap-1">
              {navigation.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  onClick={() => setActiveSection(item.id)}
                  className={`${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                      : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                  } transition-all duration-300`}
                >
                  <Icon name={item.icon} size={18} className="mr-2" />
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Основной контент */}
      <main className="py-8">{renderContent()}</main>

      {/* Подвал */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-purple-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-xl">
                  <Icon name="Camera" size={20} className="text-white" />
                </div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  PhotoPro
                </h3>
              </div>
              <p className="text-gray-600">
                Профессиональная обработка и сжатие изображений с сохранением
                высокого качества.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Возможности</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-green-500" />
                  Автоматическое сжатие
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-green-500" />
                  Оптимизация для веба
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-green-500" />
                  Быстрая обработка
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-green-500" />
                  Поддержка всех форматов
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Контакты</h4>
              <div className="space-y-2 text-gray-600">
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={16} className="text-purple-500" />
                  hello@photosite.com
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={16} className="text-purple-500" />
                  +7 (999) 123-45-67
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-purple-100 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2024 PhotoPro. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
