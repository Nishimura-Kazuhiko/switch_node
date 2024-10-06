# generate tool some class property to config property set
# - make config_property.txt (copy and pasete some class property define)
# - give some class name by this script arg
# - make property define for Config class
# - make new property define  for some class

$CLASS_NAME = $ARGV[0] . '_';

open(DATA,'config_property.txt');
@line = <DATA>;
close(DATA);

@config_line = ();
@some_line = ();

foreach $l (@line){
	chomp($l);

	if($l =~ /\=/){
		@values = split(/\=/,$l);
		$some_prop = $values[0];
		$config_value = $values[1];

		$head_space = $values[0];
		$head_space =~ s/^( +).+/$1/;

		$some_prop =~ s/^ +//;
		$some_prop =~ s/ +$//;
		$config_prop = $some_prop;
		$config_prop =~ s/this\./$CLASS_NAME/;

		$some_str = $head_space . $some_prop . ' = ' . 'config.' . $config_prop . ';';
		push(@some_line,$some_str);

		$config_value =~ s/^ +//;

		$config_str = $head_space . 'this.' . $config_prop . ' = ' . $config_value;
		push(@config_line,$config_str);
	}
}

foreach $sl(@some_line){
	print("$sl\n");
}
print("\n");
foreach $cl(@config_line){
	print("$cl\n");
}
print("\n");
