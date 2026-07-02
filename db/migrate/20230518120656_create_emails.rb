class CreateEmails < ActiveRecord::Migration[7.0]
  def change
    create_table :emails, id: :uuid do |t|
      t.string :email

      t.references :category, type: :uuid, null: false, foreign_key: true
      t.references :contact, type: :uuid, null: false, foreign_key: true

      t.timestamps
    end
  end
end
