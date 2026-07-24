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

ActiveRecord::Schema[8.1].define(version: 2026_08_12_120000) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"
  enable_extension "pg_trgm"
  enable_extension "pgcrypto"
  enable_extension "unaccent"
  enable_extension "uuid-ossp"

  create_table "active_storage_attachments", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "blob_id", null: false
    t.datetime "created_at", null: false
    t.string "name", null: false
    t.uuid "record_id", null: false
    t.string "record_type", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.string "content_type"
    t.datetime "created_at", null: false
    t.string "filename", null: false
    t.string "key", null: false
    t.text "metadata"
    t.string "service_name", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "activities", id: :serial, force: :cascade do |t|
    t.datetime "created_at", precision: nil, null: false
    t.string "key"
    t.integer "owner_id"
    t.string "owner_type"
    t.jsonb "parameters", default: {}
    t.integer "recipient_id"
    t.string "recipient_type"
    t.integer "trackable_id"
    t.string "trackable_type"
    t.datetime "updated_at", precision: nil, null: false
    t.index ["owner_id", "owner_type"], name: "index_activities_on_owner_id_and_owner_type"
    t.index ["owner_type", "owner_id"], name: "index_activities_on_owner_type_and_owner_id"
    t.index ["recipient_id", "recipient_type"], name: "index_activities_on_recipient_id_and_recipient_type"
    t.index ["recipient_type", "recipient_id"], name: "index_activities_on_recipient_type_and_recipient_id"
    t.index ["trackable_id", "trackable_type"], name: "index_activities_on_trackable_id_and_trackable_type"
    t.index ["trackable_type", "trackable_id"], name: "index_activities_on_trackable_type_and_trackable_id"
  end

  create_table "addresses", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "address"
    t.string "address_2"
    t.uuid "category_id", null: false
    t.string "city"
    t.uuid "contact_id", null: false
    t.string "country"
    t.datetime "created_at", null: false
    t.string "postal"
    t.string "region"
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_addresses_on_category_id"
    t.index ["contact_id"], name: "index_addresses_on_contact_id"
  end

  create_table "categories", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "categorizable_type", null: false
    t.datetime "created_at", null: false
    t.text "description"
    t.string "name", null: false
    t.string "slug", null: false
    t.datetime "updated_at", null: false
    t.index ["name", "categorizable_type"], name: "index_categories_on_name_and_categorizable_type", unique: true
    t.index ["slug"], name: "index_categories_on_slug", unique: true
  end

  create_table "circles", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.boolean "mock_data", default: false, null: false
    t.string "name", null: false
    t.jsonb "settings", default: {}, null: false
    t.string "slug"
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_circles_on_slug", unique: true
  end

  create_table "contacts", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "contactable_id", null: false
    t.string "contactable_type", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["contactable_type", "contactable_id"], name: "index_contacts_on_contactable"
  end

  create_table "emails", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "category_id", null: false
    t.uuid "contact_id", null: false
    t.datetime "created_at", null: false
    t.string "email"
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_emails_on_category_id"
    t.index ["contact_id"], name: "index_emails_on_contact_id"
  end

  create_table "friendly_id_slugs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at"
    t.string "scope"
    t.string "slug", null: false
    t.uuid "sluggable_id", null: false
    t.string "sluggable_type", limit: 50
    t.index ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true
    t.index ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type"
    t.index ["sluggable_type", "sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_type_and_sluggable_id"
  end

  create_table "interaction_config_templates", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "circle_id", null: false
    t.jsonb "config", default: {}, null: false
    t.datetime "created_at", null: false
    t.uuid "interaction_ui_template_id"
    t.string "name", null: false
    t.string "slug", null: false
    t.datetime "updated_at", null: false
    t.index ["circle_id", "slug"], name: "index_interaction_config_templates_on_circle_id_and_slug", unique: true
    t.index ["circle_id"], name: "index_interaction_config_templates_on_circle_id"
    t.index ["interaction_ui_template_id"], name: "idx_on_interaction_ui_template_id_fa86b6fe6b"
  end

  create_table "interaction_ui_templates", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "name", null: false
    t.string "slug", null: false
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_interaction_ui_templates_on_slug", unique: true
  end

  create_table "memberships", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.boolean "active", default: true, null: false
    t.uuid "circle_id", null: false
    t.datetime "created_at", null: false
    t.integer "funds_cents", default: 0, null: false
    t.string "funds_currency", default: "USD", null: false
    t.string "name", null: false
    t.string "number"
    t.uuid "person_id", null: false
    t.string "slug"
    t.datetime "updated_at", null: false
    t.index ["circle_id"], name: "index_memberships_on_circle_id"
    t.index ["person_id"], name: "index_memberships_on_person_id"
    t.index ["slug"], name: "index_memberships_on_slug", unique: true
  end

  create_table "memberships_people", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.uuid "membership_id", null: false
    t.uuid "person_id", null: false
    t.datetime "updated_at", null: false
    t.index ["membership_id"], name: "index_memberships_people_on_membership_id"
    t.index ["person_id"], name: "index_memberships_people_on_person_id"
  end

  create_table "orgs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "circle_id", null: false
    t.datetime "created_at", null: false
    t.string "description"
    t.string "name", null: false
    t.string "slug"
    t.datetime "updated_at", null: false
    t.index ["circle_id"], name: "index_orgs_on_circle_id"
    t.index ["slug"], name: "index_orgs_on_slug", unique: true
  end

  create_table "people", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.boolean "active", default: true, null: false
    t.datetime "created_at", null: false
    t.string "first_name"
    t.string "last_name"
    t.string "middle_name"
    t.string "slug"
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_people_on_slug", unique: true
  end

  create_table "pg_search_documents", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.text "content"
    t.datetime "created_at", null: false
    t.bigint "searchable_id"
    t.string "searchable_type"
    t.datetime "updated_at", null: false
    t.index ["searchable_type", "searchable_id"], name: "index_pg_search_documents_on_searchable"
  end

  create_table "phones", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "category_id", null: false
    t.uuid "contact_id", null: false
    t.datetime "created_at", null: false
    t.string "number"
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_phones_on_category_id"
    t.index ["contact_id"], name: "index_phones_on_contact_id"
  end

  create_table "presentation_distributions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "name", null: false
    t.boolean "template", default: false, null: false
    t.integer "type"
    t.datetime "updated_at", null: false
  end

  create_table "presentation_elements", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.jsonb "data", default: {}
    t.string "name", null: false
    t.string "slug"
    t.boolean "template", default: false, null: false
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_presentation_elements_on_slug", unique: true
  end

  create_table "presentation_interaction_memberships", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.jsonb "member_attributes", default: {}, null: false
    t.uuid "membership_id", null: false
    t.uuid "presentation_interaction_id", null: false
    t.datetime "updated_at", null: false
    t.index ["membership_id"], name: "index_interaction_memberships_on_membership_id"
    t.index ["presentation_interaction_id", "membership_id"], name: "index_interaction_memberships_on_interaction_and_membership", unique: true
    t.index ["presentation_interaction_id"], name: "index_interaction_memberships_on_interaction_id"
  end

  create_table "presentation_interaction_responses", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.uuid "membership_id", null: false
    t.uuid "presentation_interaction_id", null: false
    t.jsonb "response_data", default: {}, null: false
    t.datetime "updated_at", null: false
    t.index ["membership_id"], name: "index_presentation_interaction_responses_on_membership_id"
    t.index ["presentation_interaction_id", "membership_id"], name: "idx_pres_interaction_responses_on_interaction_and_membership"
    t.index ["presentation_interaction_id"], name: "idx_on_presentation_interaction_id_d5003055ab"
  end

  create_table "presentation_interactions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.boolean "accepting_responses", default: false, null: false
    t.jsonb "config", default: {}, null: false
    t.datetime "created_at", null: false
    t.uuid "interaction_ui_template_id", null: false
    t.string "name", null: false
    t.uuid "presentation_id", null: false
    t.jsonb "results", default: {}, null: false
    t.string "slug", null: false
    t.jsonb "trigger_conditions", default: {}, null: false
    t.integer "trigger_type", default: 0, null: false
    t.datetime "updated_at", null: false
    t.index ["interaction_ui_template_id"], name: "index_presentation_interactions_on_interaction_ui_template_id"
    t.index ["presentation_id", "slug"], name: "index_presentation_interactions_on_presentation_id_and_slug", unique: true
    t.index ["presentation_id"], name: "index_presentation_interactions_on_presentation_id"
  end

  create_table "presentations", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.boolean "active", default: false, null: false
    t.uuid "active_slide_id"
    t.datetime "created_at", null: false
    t.string "name", null: false
    t.jsonb "settings", default: {}
    t.string "slug"
    t.uuid "template_id"
    t.integer "template_version"
    t.uuid "theme_id", null: false
    t.datetime "updated_at", null: false
    t.index ["active_slide_id"], name: "index_presentations_on_active_slide_id"
    t.index ["slug"], name: "index_presentations_on_slug", unique: true
    t.index ["template_id"], name: "index_presentations_on_template_id"
    t.index ["theme_id"], name: "index_presentations_on_theme_id"
  end

  create_table "presentations_elements", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.uuid "presentation_element_id", null: false
    t.uuid "presentation_id", null: false
    t.datetime "updated_at", null: false
    t.index ["presentation_element_id"], name: "index_presentations_elements_on_presentation_element_id"
    t.index ["presentation_id"], name: "index_presentations_elements_on_presentation_id"
  end

  create_table "presentations_memberships", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.integer "funds_cents"
    t.string "funds_currency", default: "USD", null: false
    t.uuid "membership_id", null: false
    t.uuid "presentation_id", null: false
    t.datetime "updated_at", null: false
    t.index ["membership_id"], name: "index_presentations_memberships_on_membership_id"
    t.index ["presentation_id"], name: "index_presentations_memberships_on_presentation_id"
  end

  create_table "presentations_orgs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.integer "ask_cents"
    t.string "ask_currency", default: "USD", null: false
    t.datetime "created_at", null: false
    t.uuid "org_id", null: false
    t.uuid "presentation_id", null: false
    t.datetime "updated_at", null: false
    t.index ["org_id"], name: "index_presentations_orgs_on_org_id"
    t.index ["presentation_id"], name: "index_presentations_orgs_on_presentation_id"
  end

  create_table "roles", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "name"
    t.uuid "resource_id"
    t.string "resource_type"
    t.datetime "updated_at", null: false
    t.index ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id"
    t.index ["resource_type", "resource_id"], name: "index_roles_on_resource"
  end

  create_table "slide_parents", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.integer "order"
    t.uuid "parentable_id", null: false
    t.string "parentable_type", null: false
    t.uuid "slide_id", null: false
    t.datetime "updated_at", null: false
    t.index ["parentable_type", "parentable_id"], name: "index_slide_parents_on_parentable"
    t.index ["parentable_type", "parentable_id"], name: "index_slide_parents_on_parentable_type_and_parentable_id"
    t.index ["slide_id"], name: "index_slide_parents_on_slide_id"
  end

  create_table "slides", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.jsonb "data"
    t.string "slug"
    t.uuid "source_slide_id"
    t.string "title"
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_slides_on_slug"
    t.index ["source_slide_id"], name: "index_slides_on_source_slide_id"
  end

  create_table "smtps", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "address"
    t.uuid "circle_id", null: false
    t.datetime "created_at", null: false
    t.string "domain"
    t.string "host", null: false
    t.string "name", null: false
    t.text "notes"
    t.string "password"
    t.integer "port"
    t.integer "security", default: 0
    t.datetime "updated_at", null: false
    t.string "username"
    t.index ["circle_id"], name: "index_smtps_on_circle_id"
  end

  create_table "templates", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "circle_id", null: false
    t.datetime "created_at", null: false
    t.string "name"
    t.jsonb "settings", default: {}, null: false
    t.string "slug"
    t.datetime "updated_at", null: false
    t.integer "version", default: 0, null: false
    t.index ["circle_id"], name: "index_templates_on_circle_id"
    t.index ["slug"], name: "index_templates_on_slug", unique: true
  end

  create_table "themes", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "circle_id", null: false
    t.datetime "created_at", null: false
    t.text "description"
    t.string "heading"
    t.string "name", null: false
    t.datetime "published_at"
    t.string "slug"
    t.integer "status", default: 0
    t.datetime "updated_at", null: false
    t.index ["circle_id"], name: "index_themes_on_circle_id"
    t.index ["slug"], name: "index_themes_on_slug", unique: true
  end

  create_table "themes_orgs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.integer "ask_cents"
    t.string "ask_currency", default: "USD", null: false
    t.datetime "created_at", null: false
    t.uuid "org_id", null: false
    t.uuid "theme_id", null: false
    t.datetime "updated_at", null: false
    t.index ["org_id"], name: "index_themes_orgs_on_org_id"
    t.index ["theme_id"], name: "index_themes_orgs_on_theme_id"
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.boolean "active", default: true, null: false
    t.datetime "confirmation_sent_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "created_at", null: false
    t.datetime "current_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.integer "failed_attempts", default: 0, null: false
    t.datetime "invitation_accepted_at"
    t.datetime "invitation_created_at"
    t.integer "invitation_limit"
    t.datetime "invitation_sent_at"
    t.string "invitation_token"
    t.integer "invitations_count", default: 0
    t.uuid "invited_by_id"
    t.string "invited_by_type"
    t.datetime "last_sign_in_at"
    t.string "last_sign_in_ip"
    t.datetime "locked_at"
    t.uuid "person_id"
    t.datetime "remember_created_at"
    t.datetime "reset_password_sent_at"
    t.string "reset_password_token"
    t.integer "sign_in_count", default: 0, null: false
    t.string "slug"
    t.jsonb "table_preferences", default: {}
    t.string "unconfirmed_email"
    t.string "unlock_token"
    t.datetime "updated_at", null: false
    t.jsonb "user_preferences", default: {}
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["invitation_token"], name: "index_users_on_invitation_token", unique: true
    t.index ["invited_by_id"], name: "index_users_on_invited_by_id"
    t.index ["invited_by_type", "invited_by_id"], name: "index_users_on_invited_by"
    t.index ["person_id"], name: "index_users_on_person_id"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["slug"], name: "index_users_on_slug", unique: true
    t.index ["table_preferences"], name: "index_users_on_table_preferences", using: :gin
    t.index ["unlock_token"], name: "index_users_on_unlock_token", unique: true
    t.index ["user_preferences"], name: "index_users_on_user_preferences", using: :gin
  end

  create_table "users_roles", id: false, force: :cascade do |t|
    t.uuid "role_id"
    t.uuid "user_id"
    t.index ["role_id"], name: "index_users_roles_on_role_id"
    t.index ["user_id", "role_id"], name: "index_users_roles_on_user_id_and_role_id"
    t.index ["user_id"], name: "index_users_roles_on_user_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "addresses", "categories"
  add_foreign_key "addresses", "contacts"
  add_foreign_key "emails", "categories"
  add_foreign_key "emails", "contacts"
  add_foreign_key "interaction_config_templates", "circles"
  add_foreign_key "interaction_config_templates", "interaction_ui_templates"
  add_foreign_key "memberships", "circles"
  add_foreign_key "memberships", "people"
  add_foreign_key "memberships_people", "memberships"
  add_foreign_key "memberships_people", "people"
  add_foreign_key "orgs", "circles"
  add_foreign_key "phones", "categories"
  add_foreign_key "phones", "contacts"
  add_foreign_key "presentation_interaction_memberships", "memberships"
  add_foreign_key "presentation_interaction_memberships", "presentation_interactions"
  add_foreign_key "presentation_interaction_responses", "memberships"
  add_foreign_key "presentation_interaction_responses", "presentation_interactions"
  add_foreign_key "presentation_interactions", "interaction_ui_templates"
  add_foreign_key "presentation_interactions", "presentations"
  add_foreign_key "presentations", "slides", column: "active_slide_id"
  add_foreign_key "presentations", "templates"
  add_foreign_key "presentations", "themes"
  add_foreign_key "presentations_elements", "presentation_elements"
  add_foreign_key "presentations_elements", "presentations"
  add_foreign_key "presentations_memberships", "memberships"
  add_foreign_key "presentations_memberships", "presentations"
  add_foreign_key "presentations_orgs", "orgs"
  add_foreign_key "presentations_orgs", "presentations"
  add_foreign_key "slide_parents", "slides"
  add_foreign_key "slides", "slides", column: "source_slide_id"
  add_foreign_key "smtps", "circles"
  add_foreign_key "templates", "circles"
  add_foreign_key "themes", "circles"
  add_foreign_key "themes_orgs", "orgs"
  add_foreign_key "themes_orgs", "themes"
  add_foreign_key "users", "people"
end
