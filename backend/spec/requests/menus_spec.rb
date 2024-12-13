require 'rails_helper'

RSpec.describe 'Menus API', type: :request do
  describe 'GET /api/v1/menus' do
    let(:path) { '/api/v1/menus' }
    let!(:menu1) { create(:menu, name: 'Margherita', price_centimos: 850) }
    let!(:menu2) { create(:menu, name: 'Pepperoni', price_centimos: 1000) }
    let!(:menu3) { create(:menu, name: 'Veggie', price_centimos: 900) }

    context 'when filtering by name' do
      it 'returns the filtered menus' do
        get path, params: { name: 'Margherita' }

        expect(response).to have_http_status(:ok)
        expect(response.parsed_body['data'].size).to eq(1)
        expect(response.parsed_body['data'].first['attributes']['name']).to eq('Margherita')
      end

      it 'is case-insensitive' do
        get path, params: { name: 'mARGHerita' }

        expect(response).to have_http_status(:ok)
        expect(response.parsed_body['data'].size).to eq(1)
        expect(response.parsed_body['data'].first['attributes']['name']).to eq('Margherita')
      end
    end

    context 'when sorting by price' do
      it 'returns menus sorted by ascending price' do
        get path, params: { sort_by: 'price', sort_direction: 'asc' }

        expect(response).to have_http_status(:ok)
        expect(response.parsed_body['data'].map { |menu| menu['attributes']['name'] }).to eq([ 'Margherita', 'Veggie', 'Pepperoni' ])
      end

      it 'returns menus sorted by descending price' do
        get path, params: { sort_by: 'price', sort_direction: 'desc' }

        expect(response).to have_http_status(:ok)
        expect(response.parsed_body['data'].map { |menu| menu['attributes']['name'] }).to eq([ 'Pepperoni', 'Veggie', 'Margherita' ])
      end
    end

    context 'when no sort params are provided' do
      it 'returns all menus without ordering' do
        get path, params: {}

        expect(response).to have_http_status(:ok)
        expect(response.parsed_body['data'].size).to eq(3)
      end
    end

    context 'when invalid sort parameters are provided' do
      it 'returns menus without sorting' do
        get path, params: { sort_by: 'invalid_field', sort_direction: 'asc' }

        expect(response).to have_http_status(:ok)
        expect(response.parsed_body['data'].size).to eq(3)
      end
    end
  end
end
