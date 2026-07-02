class CreateSmtps < ActiveRecord::Migration[8.1]
  def change
    create_table :smtps, id: :uuid do |t|
      t.references :circle, null: false, foreign_key: true, type: :uuid

      t.string :name, null: false      # Human readable identifier
      t.string :host, null: false      # SMTP host address
      t.integer :port                  # SMTP port
      t.integer :security, default: 0  # enum: 'plain', 'tls' or 'ssl'
      t.string :username               # Email account username
      t.string :password               # Email account password
      t.string :domain                 # Domain of the email account
      t.string :address                # Sender address for reply-to header
      t.text :notes                    # Any extra notes

      t.timestamps
    end
  end
end
