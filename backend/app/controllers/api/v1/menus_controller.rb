module Api
  module V1
    class MenusController < ApplicationController
      def index
        menus = Menu.filtered(filter_params).ordered(sort_params)
        render json: MenuSerializer.new(menus).serializable_hash
      end

      private

      def filter_params
        params.permit(:name)
      end

      def sort_params
        params.permit(:sort_by, :sort_direction)
      end
    end
  end
end
