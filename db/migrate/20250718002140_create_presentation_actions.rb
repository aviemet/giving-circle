class CreatePresentationActions < ActiveRecord::Migration[8.0]
  def change
    create_table :presentation_actions, id: :uuid do |t|
      t.string :slug
      t.integer :action_type
      t.jsonb :config
      t.jsonb :results
      t.integer :trigger_type
      t.jsonb :trigger_conditions

      t.timestamps
    end
  end
end
