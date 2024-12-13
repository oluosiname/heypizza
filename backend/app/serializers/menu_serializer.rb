class MenuSerializer
  include JSONAPI::Serializer
  attributes :id, :name

  attribute :price do |menu|
    (menu.price_centimos.to_f / 100).round(2)
  end
end
