# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2024_11_19_222040) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_trgm"
  enable_extension "pgcrypto"
  enable_extension "plpgsql"
  enable_extension "unaccent"
  enable_extension "uuid-ossp"

  create_table "addresses", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "address"
    t.string "address_2"
    t.string "city"
    t.string "region"
    t.string "country"
    t.string "postal"
    t.uuid "contact_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["contact_id"], name: "index_addresses_on_contact_id"
  end

  create_table "circles", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.string "slug", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_circles_on_slug", unique: true
  end

  create_table "contacts", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "contactable_type", null: false
    t.uuid "contactable_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["contactable_type", "contactable_id"], name: "index_contacts_on_contactable"
  end

  create_table "emails", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "email"
    t.uuid "contact_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["contact_id"], name: "index_emails_on_contact_id"
  end

  create_table "friendly_id_slugs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "slug", null: false
    t.uuid "sluggable_id", null: false
    t.string "sluggable_type", limit: 50
    t.string "scope"
    t.datetime "created_at"
    t.index ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true
    t.index ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type"
    t.index ["sluggable_type", "sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_type_and_sluggable_id"
  end

  create_table "memberships", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.string "number"
    t.integer "funds_cents", default: 0, null: false
    t.string "funds_currency", default: "USD", null: false
    t.boolean "active", default: true, null: false
    t.string "slug", null: false
    t.uuid "person_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["person_id"], name: "index_memberships_on_person_id"
    t.index ["slug"], name: "index_memberships_on_slug", unique: true
  end

  create_table "memberships_people", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "membership_id", null: false
    t.uuid "person_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["membership_id"], name: "index_memberships_people_on_membership_id"
    t.index ["person_id"], name: "index_memberships_people_on_person_id"
  end

  create_table "orgs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.string "description"
    t.string "slug", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_orgs_on_slug", unique: true
  end

  create_table "ownerships", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "circle_id", null: false
    t.string "ownable_type", null: false
    t.uuid "ownable_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["circle_id"], name: "index_ownerships_on_circle_id"
    t.index ["ownable_type", "ownable_id"], name: "index_ownerships_on_ownable"
  end

  create_table "people", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "middle_name"
    t.boolean "active", default: true, null: false
    t.string "slug", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_people_on_slug", unique: true
  end

  create_table "pg_search_documents", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.text "content"
    t.string "searchable_type"
    t.bigint "searchable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["searchable_type", "searchable_id"], name: "index_pg_search_documents_on_searchable"
  end

  create_table "phones", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "number"
    t.uuid "contact_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["contact_id"], name: "index_phones_on_contact_id"
  end

  create_table "presentation_distributions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.integer "type"
    t.boolean "template", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "presentation_elements", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.jsonb "data", default: {}
    t.boolean "template", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "presentation_slides", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.jsonb "data", default: {}
    t.integer "order"
    t.boolean "template", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "presentation_votes", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.jsonb "data", default: {}
    t.boolean "template", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "presentations", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.jsonb "settings", default: {}
    t.boolean "active", default: false, null: false
    t.boolean "template", default: false, null: false
    t.uuid "theme_id", null: false
    t.uuid "presentation_template_id"
    t.string "slug", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["presentation_template_id"], name: "index_presentations_on_presentation_template_id"
    t.index ["slug"], name: "index_presentations_on_slug", unique: true
    t.index ["theme_id"], name: "index_presentations_on_theme_id"
  end

  create_table "presentations_distributions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "presentation_id", null: false
    t.uuid "presentation_distribution_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["presentation_distribution_id"], name: "idx_on_presentation_distribution_id_1e817598d7"
    t.index ["presentation_id"], name: "index_presentations_distributions_on_presentation_id"
  end

  create_table "presentations_elements", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "presentation_id", null: false
    t.uuid "presentation_element_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["presentation_element_id"], name: "index_presentations_elements_on_presentation_element_id"
    t.index ["presentation_id"], name: "index_presentations_elements_on_presentation_id"
  end

  create_table "presentations_memberships", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "presentation_id", null: false
    t.uuid "membership_id", null: false
    t.integer "funds_cents"
    t.string "funds_currency", default: "USD", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["membership_id"], name: "index_presentations_memberships_on_membership_id"
    t.index ["presentation_id"], name: "index_presentations_memberships_on_presentation_id"
  end

  create_table "presentations_orgs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "presentation_id", null: false
    t.uuid "org_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["org_id"], name: "index_presentations_orgs_on_org_id"
    t.index ["presentation_id"], name: "index_presentations_orgs_on_presentation_id"
  end

  create_table "presentations_slides", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "presentation_id", null: false
    t.uuid "presentation_slide_id", null: false
    t.string "instance_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["presentation_id"], name: "index_presentations_slides_on_presentation_id"
    t.index ["presentation_slide_id"], name: "index_presentations_slides_on_presentation_slide_id"
  end

  create_table "presentations_votes", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "presentation_id", null: false
    t.uuid "presentation_vote_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["presentation_id"], name: "index_presentations_votes_on_presentation_id"
    t.index ["presentation_vote_id"], name: "index_presentations_votes_on_presentation_vote_id"
  end

  create_table "roles", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.string "resource_type"
    t.uuid "resource_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id"
    t.index ["resource_type", "resource_id"], name: "index_roles_on_resource"
  end

  create_table "themes", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.datetime "published_at"
    t.integer "status", default: 0
    t.string "slug", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_themes_on_slug", unique: true
  end

  create_table "themes_orgs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "org_id", null: false
    t.uuid "theme_id", null: false
    t.integer "ask_cents"
    t.string "ask_currency", default: "USD", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["org_id"], name: "index_themes_orgs_on_org_id"
    t.index ["theme_id", "org_id"], name: "index_themes_orgs_on_theme_id_and_org_id", unique: true
    t.index ["theme_id"], name: "index_themes_orgs_on_theme_id"
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "invitation_token"
    t.datetime "invitation_created_at"
    t.datetime "invitation_sent_at"
    t.datetime "invitation_accepted_at"
    t.integer "invitation_limit"
    t.integer "invitations_count", default: 0
    t.string "invited_by_type"
    t.uuid "invited_by_id"
    t.boolean "active", default: true, null: false
    t.uuid "person_id"
    t.jsonb "table_preferences", default: {}
    t.jsonb "user_preferences", default: {}
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["invitation_token"], name: "index_users_on_invitation_token", unique: true
    t.index ["invited_by_id"], name: "index_users_on_invited_by_id"
    t.index ["invited_by_type", "invited_by_id"], name: "index_users_on_invited_by"
    t.index ["person_id"], name: "index_users_on_person_id"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["table_preferences"], name: "index_users_on_table_preferences", using: :gin
    t.index ["unlock_token"], name: "index_users_on_unlock_token", unique: true
    t.index ["user_preferences"], name: "index_users_on_user_preferences", using: :gin
  end

  create_table "users_roles", id: false, force: :cascade do |t|
    t.uuid "user_id"
    t.uuid "role_id"
    t.index ["role_id"], name: "index_users_roles_on_role_id"
    t.index ["user_id", "role_id"], name: "index_users_roles_on_user_id_and_role_id"
    t.index ["user_id"], name: "index_users_roles_on_user_id"
  end

  add_foreign_key "addresses", "contacts"
  add_foreign_key "memberships", "people"
  add_foreign_key "memberships_people", "memberships"
  add_foreign_key "memberships_people", "people"
  add_foreign_key "ownerships", "circles"
  add_foreign_key "presentations", "presentations", column: "presentation_template_id"
  add_foreign_key "presentations", "themes"
  add_foreign_key "presentations_distributions", "presentation_distributions"
  add_foreign_key "presentations_distributions", "presentations"
  add_foreign_key "presentations_elements", "presentation_elements"
  add_foreign_key "presentations_elements", "presentations"
  add_foreign_key "presentations_memberships", "memberships"
  add_foreign_key "presentations_memberships", "presentations"
  add_foreign_key "presentations_orgs", "orgs"
  add_foreign_key "presentations_orgs", "presentations"
  add_foreign_key "presentations_slides", "presentation_slides"
  add_foreign_key "presentations_slides", "presentations"
  add_foreign_key "presentations_votes", "presentation_votes"
  add_foreign_key "presentations_votes", "presentations"
  add_foreign_key "themes_orgs", "orgs"
  add_foreign_key "themes_orgs", "themes"
  add_foreign_key "users", "people"
end
