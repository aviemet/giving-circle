class CreatePresentationInteractionResponses < ActiveRecord::Migration[8.0]
  def change
    create_table :presentation_interaction_responses, id: :uuid do |t|
      t.references :presentation_interaction, null: false, foreign_key: true, type: :uuid
      t.references :membership, null: false, foreign_key: true, type: :uuid
      t.jsonb :response_data, null: false, default: {}

      t.timestamps
    end

    add_index :presentation_interaction_responses,
      [:presentation_interaction_id, :membership_id],
      name: "idx_pres_interaction_responses_on_interaction_and_membership"
  end
end
