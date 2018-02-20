RSpec::Matchers.alias_matcher :array_of, :be_array_of

RSpec::Matchers.define :be_called_with do |*args|
  match do |service|
    double = instance_double(service)

    expect(service).to receive(:new).with(*args).and_return(double)
    expect(double).to receive(:call)
    true
  end
end
