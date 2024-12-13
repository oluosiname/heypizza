module Api
  module V1
    class MenusController < ApplicationController
      PER_PAGE = 10
      def index
        menus = Menu.filtered(permitted_params)
                  .ordered(permitted_params)
                  .page(permitted_params[:page])
                  .per(permitted_params[:per_page] || PER_PAGE)

        render json: {
          data: MenuSerializer.new(menus).serializable_hash[:data],
          total_pages: menus.total_pages
        }
      end

      private

      def permitted_params
        params.permit(:name, :page, :per_page, :sort_by, :sort_direction)
      end
    end
  end
end
