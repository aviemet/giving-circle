require 'rails_helper'
require_relative '../support/devise'

RSpec.describe "/people", type: :request do
  def valid_attributes
    { person: attributes_for(:person) }
  end

  def invalid_attributes
    { person: { first_name: "", last_name: "" } }
  end

  describe "GET /index" do
    login_super_admin

    it "renders a successful response" do
      create(:person)

      get people_url

      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    login_super_admin

    it "renders a successful response" do
      person = create(:person)

      get person_url(person)

      expect(response).to be_successful
    end
  end

  describe "GET /new" do
    login_super_admin

    it "renders a successful response" do
      get new_person_url

      expect(response).to be_successful
    end
  end

  describe "GET /edit" do
    login_super_admin

    it "renders a successful response" do
      person = create(:person)

      get edit_person_url(person)

      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    login_super_admin

    context "with valid parameters" do
      it "creates a new Person" do
        expect {
          post people_url, params: valid_attributes
        }.to change(Person, :count).by(1)
      end

      it "redirects to the created person" do
        post people_url, params: valid_attributes

        expect(response).to redirect_to(person_url(Person.last))
        expect(flash[:notice]).to eq(I18n.t('people.notices.created'))
      end
    end

    context "with invalid parameters" do
      it "does not create a new Person" do
        expect {
          post people_url, params: invalid_attributes
        }.not_to change(Person, :count)
      end

      it "redirects back to the new person page" do
        post people_url, params: invalid_attributes

        expect(response).to redirect_to(new_person_url)
      end

    end
  end

  describe "PATCH /update" do
    login_super_admin

    context "with valid parameters" do
      it "updates the requested person" do
        person = create(:person)
        new_attributes = valid_attributes

        patch person_url(person), params: new_attributes
        person.reload

        expect(person.first_name).to eq(new_attributes[:person][:first_name])
        expect(person.last_name).to eq(new_attributes[:person][:last_name])
      end

      it "redirects to the person" do
        person = create(:person)
        new_attributes = valid_attributes

        patch person_url(person), params: new_attributes
        person.reload

        expect(response).to redirect_to(person_url(person))
        expect(flash[:notice]).to eq(I18n.t('people.notices.updated'))
      end
    end

    context "with invalid parameters" do
      it "redirects back to the edit person page" do
        person = create(:person)

        patch person_url(person), params: invalid_attributes

        expect(response).to redirect_to(edit_person_url(person))
      end

    end
  end

  describe "DELETE /destroy" do
    login_super_admin

    it "destroys the requested person" do
      person = create(:person)

      expect {
        delete person_url(person)
      }.to change(Person, :count).by(-1)
    end

    it "redirects to the people list" do
      person = create(:person)

      delete person_url(person)

      expect(response).to redirect_to(people_url)
      expect(flash[:notice]).to eq(I18n.t('people.notices.destroyed'))
    end
  end
end
