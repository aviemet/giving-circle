class CreatePresentationActionResponses < ActiveRecord::Migration[8.0]
  def change
    create_table :presentation_action_responses, id: :uuid do |t|
      t.references :presentation_action, null: false, foreign_key: true, type: :uuid
      t.references :membership, null: false, foreign_key: true, type: :uuid
      t.jsonb :response_data

      t.timestamps
    end
  end
end
