class CreatePresentationInteractionMemberships < ActiveRecord::Migration[7.2]
  def change
    create_table :presentation_interaction_memberships, id: :uuid do |t|
      t.references :presentation_interaction,
        type: :uuid,
        null: false,
        foreign_key: { to_table: :presentation_interactions },
        index: { name: "index_interaction_memberships_on_interaction_id" }
      t.references :membership,
        type: :uuid,
        null: false,
        foreign_key: true,
        index: { name: "index_interaction_memberships_on_membership_id" }
      t.jsonb :member_attributes, null: false, default: {}

      t.timestamps
    end

    add_index :presentation_interaction_memberships,
      [:presentation_interaction_id, :membership_id],
      unique: true,
      name: "index_interaction_memberships_on_interaction_and_membership"
  end
end
