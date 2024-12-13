class Menu < ApplicationRecord
  SORT_FIELDS = {
    "price" => "price_centimos"
  }.freeze

  SORT_DIRECTIONS = %w[asc desc].freeze

  FILTERABLE_FIELDS = %w[name].freeze

  validates :name, presence: true
  validates :price_centimos, presence: true
  validates :name, uniqueness: true

  scope :filtered, ->(params) {
    result = all
    params.each do |key, value|
      result = result.send("search_by_#{key}", value) if value.present? && FILTERABLE_FIELDS.include?(key.to_s)
    end
    result
  }

  scope :ordered, ->(sort_params) {
    result = all

    field = SORT_FIELDS[sort_params[:sort_by]]
    direction = sort_params[:sort_direction]

    if SORT_DIRECTIONS.include?(direction) && field.present?
      result = result.order(field => direction)
    end
    result
  }

  scope :search_by_name, ->(name) { where("name ILIKE ?", "%#{name}%") }
end
