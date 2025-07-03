import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface Photo {
  id: string;
  title: string;
  url: string;
  category: string;
  size: string;
  views: number;
}

const PhotoGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Пример данных для галереи
  const samplePhotos: Photo[] = [
    {
      id: "1",
      title: "Профессиональные фото",
      url: "/placeholder.svg",
      category: "professional",
      size: "2.1 МБ",
      views: 1247,
    },
    {
      id: "2",
      title: "Креативные снимки",
      url: "/placeholder.svg",
      category: "creative",
      size: "1.8 МБ",
      views: 892,
    },
    {
      id: "3",
      title: "Портретная съемка",
      url: "/placeholder.svg",
      category: "portrait",
      size: "3.2 МБ",
      views: 2156,
    },
    {
      id: "4",
      title: "Природа и пейзажи",
      url: "/placeholder.svg",
      category: "nature",
      size: "2.7 МБ",
      views: 1634,
    },
    {
      id: "5",
      title: "Архитектура",
      url: "/placeholder.svg",
      category: "architecture",
      size: "1.9 МБ",
      views: 743,
    },
    {
      id: "6",
      title: "Стрит-фото",
      url: "/placeholder.svg",
      category: "street",
      size: "2.4 МБ",
      views: 1098,
    },
  ];

  const categories = [
    { id: "all", label: "Все", icon: "Grid3X3" },
    { id: "professional", label: "Профессиональные", icon: "Briefcase" },
    { id: "creative", label: "Креативные", icon: "Palette" },
    { id: "portrait", label: "Портреты", icon: "User" },
    { id: "nature", label: "Природа", icon: "Trees" },
    { id: "architecture", label: "Архитектура", icon: "Building" },
    { id: "street", label: "Улица", icon: "Camera" },
  ];

  const filteredPhotos =
    selectedCategory === "all"
      ? samplePhotos
      : samplePhotos.filter((photo) => photo.category === selectedCategory);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Галерея фотографий
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Просмотрите нашу коллекцию обработанных и оптимизированных изображений
        </p>
      </div>

      {/* Категории */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className={`${
              selectedCategory === category.id
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                : "border-purple-200 text-purple-600 hover:bg-purple-50"
            }`}
          >
            <Icon name={category.icon} size={16} className="mr-2" />
            {category.label}
          </Button>
        ))}
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-6 text-center bg-gradient-to-br from-purple-50 to-blue-50">
          <div className="flex items-center justify-center mb-2">
            <Icon name="Image" size={24} className="text-purple-600 mr-2" />
            <span className="text-2xl font-bold text-purple-600">
              {filteredPhotos.length}
            </span>
          </div>
          <p className="text-sm text-gray-600">Изображений в галерее</p>
        </Card>

        <Card className="p-6 text-center bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="flex items-center justify-center mb-2">
            <Icon name="TrendingUp" size={24} className="text-green-600 mr-2" />
            <span className="text-2xl font-bold text-green-600">
              {filteredPhotos
                .reduce((sum, photo) => sum + photo.views, 0)
                .toLocaleString()}
            </span>
          </div>
          <p className="text-sm text-gray-600">Общие просмотры</p>
        </Card>

        <Card className="p-6 text-center bg-gradient-to-br from-orange-50 to-red-50">
          <div className="flex items-center justify-center mb-2">
            <Icon name="Zap" size={24} className="text-orange-600 mr-2" />
            <span className="text-2xl font-bold text-orange-600">78%</span>
          </div>
          <p className="text-sm text-gray-600">Среднее сжатие</p>
        </Card>
      </div>

      {/* Сетка фотографий */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo, index) => (
          <Card
            key={photo.id}
            className="overflow-hidden group hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="relative overflow-hidden">
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center justify-between text-white">
                  <Badge
                    variant="secondary"
                    className="bg-white/20 text-white border-white/30"
                  >
                    {photo.size}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Icon name="Eye" size={16} />
                    <span className="text-sm">
                      {photo.views.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                {photo.title}
              </h3>

              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {categories.find((c) => c.id === photo.category)?.label}
                </Badge>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="hover:bg-purple-50 hover:text-purple-600"
                  >
                    <Icon name="Download" size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="hover:bg-purple-50 hover:text-purple-600"
                  >
                    <Icon name="Share" size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredPhotos.length === 0 && (
        <Card className="p-12 text-center">
          <Icon
            name="ImageOff"
            size={48}
            className="text-gray-400 mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            Ничего не найдено
          </h3>
          <p className="text-gray-500">Попробуйте выбрать другую категорию</p>
        </Card>
      )}
    </div>
  );
};

export default PhotoGallery;
