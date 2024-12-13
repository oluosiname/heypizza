require 'rails_helper'

RSpec.describe Menu, type: :model do
  describe 'scopes' do
    let!(:menu1) { create(:menu, name: 'Margherita', price_centimos: 850) }
    let!(:menu2) { create(:menu, name: 'Pepperoni', price_centimos: 1000) }
    let!(:menu3) { create(:menu, name: 'Veggie', price_centimos: 900) }

    describe '.filtered' do
      context 'when filtering by name' do
        it 'returns menus matching the name' do
          result = described_class.filtered({ name: 'Margherita' })
          expect(result).to contain_exactly(menu1)
        end

        it 'is case-insensitive' do
          result = described_class.filtered({ name: 'mARGHerita' })
          expect(result).to contain_exactly(menu1)
        end

        it 'ignores empty filter values' do
          result = described_class.filtered({ name: '' })
          expect(result).to contain_exactly(menu1, menu2, menu3)
        end
      end

      context 'when no filter params are provided' do
        it 'returns all menus' do
          result = described_class.filtered({})
          expect(result).to contain_exactly(menu1, menu2, menu3)
        end
      end

      context 'when using non-existing search keys' do
        it 'returns all menus' do
          result = described_class.filtered({ non_existing_key: 'value' })
          expect(result).to contain_exactly(menu1, menu2, menu3)
        end
      end
    end

    describe '.ordered' do
      context 'when ordering by price' do
        it 'orders by ascending price' do
          result = described_class.ordered({ sort_by: 'price', sort_direction: 'asc' })
          expect(result).to eq([ menu1, menu3, menu2 ])
        end

        it 'orders by descending price' do
          result = described_class.ordered({ sort_by: 'price', sort_direction: 'desc' })
          expect(result).to eq([ menu2, menu3, menu1 ])
        end
      end

      context 'when no sort params are provided' do
        it 'returns all menus without ordering' do
          result = described_class.ordered({})
          expect(result).to contain_exactly(menu1, menu2, menu3)
        end
      end

      context 'when invalid sort parameters are provided' do
        it 'ignores invalid sort directions' do
          result = described_class.ordered({ sort_by: 'price', sort_direction: 'invalid' })
          expect(result).to contain_exactly(menu1, menu2, menu3)
        end

        it 'ignores invalid sort fields' do
          result = described_class.ordered({ sort_by: 'invalid_field', sort_direction: 'asc' })
          expect(result).to contain_exactly(menu1, menu2, menu3)
        end
      end
    end

    describe 'combined filtered and ordered' do
      context 'when filtering by name and ordering by price' do
        it 'filters and sorts by ascending price' do
          result = described_class.filtered({ name: 'Pepperoni' }).ordered({ 'price_centimos' => 'asc' })
          expect(result).to eq([ menu2 ])
        end

        it 'filters and sorts by descending price' do
          result = described_class.filtered({ name: 'Veggie' }).ordered({ 'price_centimos' => 'desc' })
          expect(result).to eq([ menu3 ])
        end
      end

      context 'when filters exclude all records' do
        it 'returns no results' do
          result = described_class.filtered({ name: 'NonExistent' }).ordered({ 'price_centimos' => 'asc' })
          expect(result).to be_empty
        end
      end
    end
  end
end
