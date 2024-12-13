class CreateMenus < ActiveRecord::Migration[7.2]
  def change
    create_table :menus do |t|
      t.string :name, null: false, index: { unique: true }
      t.integer :price_centimos, null: false
      t.timestamps
    end
  end
end
