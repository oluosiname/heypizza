FactoryBot.define do
  factory :menu do
    name { Faker::Food.dish }
    price_centimos { Faker::Number.number(digits: 4) }
  end
end
